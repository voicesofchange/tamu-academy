import { createClientFromRequest } from 'npm:@base44/sdk@0.8.52';

/**
 * getGuideInsights — anonymous, aggregated Kioo results for administrators.
 *
 * Returns only per-statement averages for the first reflection and for return
 * reflections, plus attempt counts. No learner id, email, name or individual
 * answer ever leaves this function.
 */

const STATEMENT_IDS = ['s1', 's2', 's3', 's4', 's5', 's6', 's7', 's8', 's9', 's10'];

export default async function (req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const attempts = await base44.asServiceRole.entities.KiooAttempt.list('-attempt_date', 2000);

    const tally = {
      first: { learners: new Set(), total: 0 },
      return: { learners: new Set(), total: 0 },
    };
    const perStatement = {};
    STATEMENT_IDS.forEach((id) => {
      perStatement[id] = {
        first: { sum: 0, count: 0 },
        return: { sum: 0, count: 0 },
      };
    });

    (attempts || []).forEach((attempt) => {
      const type = attempt.attempt_type === 'return' ? 'return' : 'first';
      tally[type].total += 1;
      if (attempt.learner_id) tally[type].learners.add(attempt.learner_id);
      STATEMENT_IDS.forEach((id) => {
        const raw = Number(attempt[`r${id.replace('s', '')}`]);
        if (!Number.isFinite(raw) || raw < 1 || raw > 5) return;
        perStatement[id][type].sum += raw;
        perStatement[id][type].count += 1;
      });
    });

    const statements = STATEMENT_IDS.map((id) => {
      const f = perStatement[id].first;
      const r = perStatement[id].return;
      const firstAvg = f.count ? Number((f.sum / f.count).toFixed(2)) : null;
      const returnAvg = r.count ? Number((r.sum / r.count).toFixed(2)) : null;
      return {
        statement_id: id,
        first_average: firstAvg,
        first_responses: f.count,
        return_average: returnAvg,
        return_responses: r.count,
        movement: firstAvg !== null && returnAvg !== null ? Number((returnAvg - firstAvg).toFixed(2)) : null,
      };
    });

    return Response.json({
      first_attempts: tally.first.total,
      return_attempts: tally.return.total,
      learners_with_first: tally.first.learners.size,
      learners_with_return: tally.return.learners.size,
      statements,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
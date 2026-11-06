import React from 'react';
import PageLoadErrorScreen from '@/components/errors/PageLoadErrorScreen';

/**
 * AppErrorBoundary — the app-wide safety net.
 *
 * Catches any error thrown while rendering the app, or while a page's code is
 * still being fetched, and shows the friendly recovery screen instead of the
 * blank page React leaves behind when nothing catches a render error. The
 * error is logged so it stays visible in the browser console for diagnosis.
 *
 * Deliberately the last wrapper before the routes, so nothing else in the app
 * has to know it exists, and it changes no page, layout or route.
 */
export default class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Unexpected application error:', error, info?.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return <PageLoadErrorScreen />;
    }
    return this.props.children;
  }
}
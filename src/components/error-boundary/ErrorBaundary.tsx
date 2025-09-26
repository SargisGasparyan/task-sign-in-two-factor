import React, { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  // Вызывается, если в потомках произошло исключение
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  // Логируем детали (опционально можно отправить на сервер)
  componentDidCatch(error: unknown, info: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? <h1>Что-то пошло не так.</h1>;
    }
    return this.props.children;
  }
}

import React from 'react';

class NotefulError extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    
    static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
    }

    render() {
        // If there was an error, show an error page
        if (this.state.hasError) {
            return (
                <main className="error-page">
                    <h1>Something seems to have gone wrong</h1>
                    <p>Try refreshing the page</p>
                </main>
            );
        }
        // Otherwise, render the children
        return this.props.children;
    }
}

export default NotefulError
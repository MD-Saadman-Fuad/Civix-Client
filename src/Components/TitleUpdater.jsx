import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const routeTitleMap = [
    { test: /^\/$/, title: 'Home' },
    { test: /^\/login/, title: 'Login' },
    { test: /^\/register/, title: 'Register' },
    { test: /^\/issues\/?$/, title: 'All Issues' },
    { test: /^\/issues\//, title: 'Issue Details' },
    { test: /^\/my-issues/, title: 'My Issues' },
    { test: /^\/my-contributions/, title: 'My Contributions' },
    { test: /^\/add-issues/, title: 'Report an Issue' },
];

const siteName = 'Civix';

const TitleUpdater = ({ defaultTitle }) => {
    const location = useLocation();

    useEffect(() => {
        const path = location.pathname;
        let title = defaultTitle || siteName;
        for (const r of routeTitleMap) {
            if (r.test.test(path)) {
                title = `${r.title} | ${siteName}`;
                break;
            }
        }
        document.title = title;
    }, [location.pathname, defaultTitle]);

    return null;
};

export default TitleUpdater;

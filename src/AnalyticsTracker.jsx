import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import analytics from "./customAnalytics";

const AnalyticsTracker = () => {
    const location = useLocation();
    ``
    useEffect(() => {
        analytics.page();
    }, [location.pathname, location.search]);

    return null;
};

export default AnalyticsTracker;
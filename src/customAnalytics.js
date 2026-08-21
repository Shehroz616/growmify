import Analytics from "analytics";
import googleAnalytics from "@analytics/google-analytics";

const analytics = Analytics({
    app: "Growmify",
    plugins: [
        googleAnalytics({
            measurementIds: ["G-0NWWK8KM4M"],
        }),
    ],
});

export default analytics;
import React from "react";
const RemoteNewsList = React.lazy(() => import("remote1/NewList"));

const App = () => (
    <>
        <h3>host本地</h3>
        <>
            <React.Suspense fallback="组件加载中...">
                <RemoteNewsList />
            </React.Suspense>
        </>
    </>
)
export default App;

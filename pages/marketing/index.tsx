import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import MarketingDemo from 'containers/marketingDemo';

const Marketing: NextPage = () => (
    <div className="mkt">
        <Layout>
            <MarketingDemo />
        </Layout>
    </div>
);

export default Marketing;

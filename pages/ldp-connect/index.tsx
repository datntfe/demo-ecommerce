import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import LandingPage from 'containers/ldp-connect';

const LandingPageConnect: NextPage = () => (
    <div className="ldp-connect">
        <Layout>
            <LandingPage />
        </Layout>
    </div>
);

export default LandingPageConnect;

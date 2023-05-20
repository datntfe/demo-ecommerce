import React from 'react';
import type { NextPage } from 'next';
import Layout from 'components/layout/layout';
import LandingPageWelcome from 'containers/ldp-welcome';

const LandingPageConnectWelcome: NextPage = () => (
    <div className="ldp-connect">
        <Layout>
            <LandingPageWelcome />
        </Layout>
    </div>
);

export default LandingPageConnectWelcome;

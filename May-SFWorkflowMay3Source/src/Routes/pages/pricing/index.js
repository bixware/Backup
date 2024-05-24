/**
 * Pricing
 */
import React, { useState } from 'react';
import Switch from 'react-toggle-switch';
import { Helmet } from "react-helmet";
// components
import PricingBlockV1 from 'Components/Pricing/PricingBlockV1';
import PricingBlockV2 from 'Components/Pricing/PricingBlockV2';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// components
import Testimonials from './Tesimonials';
import Faqs from './Faqs';

export default function PricingPage(props) {
   const [monthlyPlan, setMonthlyPlan] = useState(true);
   const [businessPlan, setBusinessPlan] = useState(30);
   const [enterprisePlan, setEnterprisePlan] = useState(59);

		// on plan change
	const onPlanChange = (isMonthly) => {
      setMonthlyPlan(!isMonthly)

		if (!isMonthly) {
         setBusinessPlan(30);
         setEnterprisePlan(59);
		} else {
         setBusinessPlan(35);
         setEnterprisePlan(70);
		}
	}

   return (
      <div className="pricing-wrapper">
         <Helmet>
            <title>Pricing</title>
            <meta name="description" content="Reactify Pricing" />
         </Helmet>
         <PageTitleBar title={<IntlMessages id="widgets.pricing" />} match={props.match} />
         <div className="pricing-top mb-50">
            <div className="row">
               <div className="col-sm-12 col-md-9 col-lg-7 mx-auto text-center">
                  <h2 className="mb-20">Choose the plan that works for you.</h2>
                  <div>
                     <span>Monthly</span>
                     <Switch onClick={() => onPlanChange(monthlyPlan)} on={monthlyPlan} />
                     <span>Yearly ( get 2 month extra)</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="price-list">
            <div className="row row-eq-height">
               <PricingBlockV1
                  planType="free"
                  type="widgets.basic"
                  color="primary"
                  description="Secure file sharing and collaboration. Ideal for small teams."
                  buttonText="widgets.startToBasic"
                  price="widgets.free"
                  users={1}
                  features={[
                     '100 GB secure storage',
                     '2 GB file upload',
                     'Minimum 3 users, max 10 users'
                  ]}
               />
               <PricingBlockV1
                  planType="premium"
                  type="widgets.pro"
                  color="warning"
                  description="More power & personalization"
                  buttonText="widgets.upgradeToPro"
                  price={businessPlan}
                  users={1}
                  features={[
                     'Unlimited storage',
                     '5 GB file upload',
                     'Minimum 3 users, max 10 users'
                  ]}
               />
               <PricingBlockV1
                  planType="premium"
                  type="widgets.advanced"
                  color="info"
                  description="More power & personalization"
                  buttonText="widgets.upgradeToAdvance"
                  price={enterprisePlan}
                  users={1}
                  features={[
                     'Unlimited storage',
                     '20 GB file upload',
                     'Minimum 13 users, max 20 users'
                  ]}
               />
            </div>
            <div className="text-center py-40">
               <h2 className="mb-0"><IntlMessages id="widgets.comparePlans" /></h2>
            </div>
            <div className="fixed-pricing">
               <div className="row no-gutters row-eq-height">
                  <div className="col-sm-12 col-md-4">
                     <PricingBlockV2
                        type="widgets.basic"
                        responses="100 responses / mo"
                        color="primary"
                        features={[
                           'Granular access and controls',
                           'Desktop sync',
                           'Mobile access',
                           'Version history',
                           'SSL and at-rest encryption',
                           'Two-factor authentication',
                           'Standard business support',
                           'User management',
                           '25,000 API calls per month'
                        ]}
                     />
                  </div>
                  <div className="col-sm-12 col-md-4">
                     <PricingBlockV2
                        type="widgets.pro"
                        responses="Unlimited responses"
                        color="warning"
                        features={[
                           'Includes all Starter features plus',
                           'Advanced user and security reporting',
                           'Custom branding',
                           'Version history',
                           'SSL and at-rest encryption',
                           'Two-factor authentication',
                           'Standard business support',
                           'User management',
                           '25,000 API calls per month'
                        ]}
                     />
                  </div>
                  <div className="col-sm-12 col-md-4">
                     <PricingBlockV2
                        type="widgets.pro"
                        responses="Unlimited responses"
                        color="info"
                        features={[
                           'Granular access and controls',
                           'Desktop sync',
                           'Mobile access',
                           'Version history',
                           'SSL and at-rest encryption',
                           'Two-factor authentication',
                           'Standard business support',
                           'User management',
                           '25,000 API calls per month'
                        ]}
                     />
                  </div>
               </div>
            </div>
         </div>
         <div className="testimonial-wrapper mb-50">
            <div className="row">
               <Testimonials />
            </div>
         </div>
         <Faqs />
      </div>
   );
}

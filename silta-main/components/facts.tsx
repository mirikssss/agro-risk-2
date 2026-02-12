// Re-export from single source of truth (shared with server API).
// Original content lives in lib/agroRiskFacts.ts for use by Investor/Jury Assistant.

import { FACTS } from '../lib/agroRiskFacts';
export { FACTS, type ProductFacts, type Readiness } from '../lib/agroRiskFacts';
export default FACTS;

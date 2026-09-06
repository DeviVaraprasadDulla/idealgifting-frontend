import TaxonomyDetailPage from "../features/taxonomy/TaxonomyDetailPage";
import { RECIPIENT_META, DEFAULT_META } from "../data/taxonomyMeta";

const RecipientDetail = () => (
  <TaxonomyDetailPage
    taxonomyName="recipient"
    backPath="/recipients"
    backLabel="See all recipients"
    metaMap={RECIPIENT_META}
    defaultMeta={DEFAULT_META}
  />
);

export default RecipientDetail;

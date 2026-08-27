import PartnerUsers from "../../../components/Admin/PartnerUsers";
import { getDistributors } from "../../../services/api";

export default function Distributors() {
  return <PartnerUsers title="Distributors" role="distributor" getUsers={getDistributors} />;
}

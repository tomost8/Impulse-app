import { useState, useEffect } from "react";
import AuthWrapper from "@/contexts/AuthWrapper";
import { useDataProvider } from "@/contexts/DataProviderContext";
// Debug
import { debugRenders } from "@/debug/utils";
// Components
import ReferralScreen from "@/components/screens/profile/ReferralScreen/ReferralScreen";
import LoadingScreen from "@/components/ui/common/loading";
import { useGenerateReferralLink } from "@/hooks/graphql/referrals/mutations";

const ReferralsPage = () => {
  const { user, fetching } = useDataProvider();
  const { generateReferralLink } = useGenerateReferralLink();

  const [referralCode, setReferralCode] = useState<string>(user?.referral_code || "");
  const [linkLoading, setLinkLoading] = useState(false);

  useEffect(() => {
    if (!user || referralCode) return;

    let cancelled = false;

    const fetchLink = async () => {
      setLinkLoading(true);
      try {
        const result = await generateReferralLink();
        if (!cancelled) {
          console.log("⛵ Fetched Referral Link:", result);
          setReferralCode(result);
        }
      } finally {
        if (!cancelled) setLinkLoading(false);
      }
    };

    fetchLink();

    return () => {
      cancelled = true; 
    };
  }, [user]);

  const loading = fetching || linkLoading || !referralCode;

  if (loading ) {
    return <LoadingScreen />;
  }  

  const referralLink = `https://impulse.app/r/${referralCode}`;
  // Distribution domain name `d1ho3n63lxlz0.cloudfront.net`
  console.log("🔗 Referral Link:", referralLink);

  if (debugRenders && !loading) {
    console.log(
      "Rendering ReferralsPage\n",
      "User:", user?.id, "\n",
      "Referral Link:", referralLink, "\n",
    );
  }

  return (
    <ReferralScreen
      loading={loading}
      referralLink={referralLink}
    />
  );
};

export default AuthWrapper(ReferralsPage);
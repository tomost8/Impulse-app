import { gql, useMutation } from '@apollo/client';

export const GENERATE_REFERRAL_LINK = gql`
  mutation GenerateReferralLink {
    generateReferralLink
  }
`;

export const useGenerateReferralLink = () => {
  const [generateReferralLinkMutation, { data, loading, error }] = useMutation(GENERATE_REFERRAL_LINK);

  const generateReferralLink = async () => {
    const result = await generateReferralLinkMutation();
    console.log("⛵ Generated Referral Link Result:", result);
    return result.data?.generateReferralLink;
  };

  return { generateReferralLink, data, loading, error };
};
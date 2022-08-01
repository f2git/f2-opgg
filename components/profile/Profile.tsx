import styled from 'styled-components';
import { useAppSelector } from '../../store';
import TierBadge from './TierBadge';

const ProfileContainer = styled.div`
  .tier-badges-area {
    height: 30px;
    display: flex;
    align-items: flex-end;
    > * {
      margin-left: 7px;
    }
  }
`;

const Profile = () => {
  const prevTiers = useAppSelector(({ summonerReducer }) => summonerReducer.selected)!.previousTiers;
  return (
    <ProfileContainer>
      <div className="tier-badges-area">
        {prevTiers.map((tier) => (
          <TierBadge key={tier.season} {...tier} />
        ))}
      </div>
      <div>2</div>
    </ProfileContainer>
  );
};

export default Profile;

import styled from 'styled-components';
import { useAppSelector } from '../../store';
import TierBadge from './TierBadge';

interface IProps {
  profileUrl: string;
  borderUrl: string;
}

const ProfileContainer = styled.div<IProps>`
  .tier-badges-area {
    height: 30px;
    display: flex;
    align-items: flex-end;
    > * {
      margin-left: 7px;
    }
  }
  .profile-image-name-area {
    margin-top: 20px;
    .profile-image {
      width: 100px;
      height: 100px;
      background-size: contain;
      background-image: url(${(props) => props.profileUrl});
    }
    .border-image {
      position: relative;
      top: -10px;
      left: -10px;
      width: 120px;
      height: 120px;
      background-size: contain;
      background-image: url(${(props) => props.borderUrl});
    }
  }
`;

const Profile = () => {
  const selected = useAppSelector(({ summonerReducer }) => summonerReducer.selected)!;
  const { previousTiers } = selected;
  return (
    <ProfileContainer profileUrl={selected.profileImageUrl} borderUrl={selected.profileBorderImageUrl}>
      <div className="tier-badges-area">
        {previousTiers.map((tier) => (
          <TierBadge key={tier.season} {...tier} />
        ))}
      </div>
      <div className="profile-image-name-area">
        <div className="profile-image">
          <div className="border-image" />
        </div>
      </div>
    </ProfileContainer>
  );
};

export default Profile;

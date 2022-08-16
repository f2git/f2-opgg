import styled from 'styled-components';
import { useAppSelector } from '../../store';
import TierBadge from './TierBadge';

interface IProps {
  profileUrl: string;
  borderUrl: string;
}

const ProfileContainer = styled.div<IProps>`
  margin-left: 20px;
  .tier-badges-area {
    margin-left: 7px;
    height: 30px;
    display: flex;
    align-items: flex-end;
    > * {
      margin-left: 7px;
    }
  }
  .profile-image-name-area {
    display: flex;
    margin-top: 10px;
    .profile-image {
      width: 100px;
      height: 100px;
      background-size: contain;
      background-image: url(${(props) => props.profileUrl});
      margin: 10px;
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
    .name-area {
      margin: 17px;
      .name {
        font-size: 20px;
        font-weight: bold;
      }
      .description {
        margin-top: 7px;
        font-size: 11px;
        span {
          font-weight: bold;
        }
      }
    }
  }
`;

const Profile = () => {
  const { selected } = useAppSelector(({ summonerReducer }) => summonerReducer);
  if (!selected) return <ProfileContainer profileUrl="" borderUrl="" />;

  const { previousTiers, name, ladderRank } = selected;

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
        <div className="name-area">
          <div className="name">{name}</div>
          <div className="description">
            Ladder Rank <span>{ladderRank.rank.toLocaleString()}</span> ( {ladderRank.rankPercentOfTop}% of top)
          </div>
        </div>
      </div>
    </ProfileContainer>
  );
};

export default Profile;

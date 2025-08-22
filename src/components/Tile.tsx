import '../styles/profile-tile.css';
import type { Profile } from '../types&interfaces/Profile';
type TileProps = {
  profile: Profile;
};

function Tile({ profile }: TileProps) {
  return (
    <div className="profile-tile">
      <div className="info">
        <div>Name: {profile.name}</div>
        <div>Age: {profile.age}</div>
        <div>Email: {profile.email}</div>
        <div>Country: {profile.country}</div>
        <div>Sex: {profile.gender}</div>
      </div>
      <img src={profile.photo} width={100}></img>
    </div>
  );
}

export default Tile;

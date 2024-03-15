import "./Loading.css";
import logo from '../../assets/images/logoRemovedBG.png';

const Loading = ({ type }) => {
	return (
		<div className={`loadingLogoContainer ${type !== 'semantic-chat' && 'h-screen'}`}>
			<img
				src={logo}
				alt="logo"
				className="loadingLogo"
			/>
		</div>
	);
}

export default Loading;

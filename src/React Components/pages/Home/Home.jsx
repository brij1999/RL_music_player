import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import Loader1 from '../../Layouts/Loader1/Loader1';
import PlaylistCards from '../../components/PlaylistCards/PlaylistCards';
import TopList from '../../components/TopList/TopList';
import RecentList from '../../components/RecentList/RecentList';
import SideBar from '../../Layouts/SideBar/SideBar';
import Player from '../../Layouts/Player/Player';
import { clear_DIR } from '../../../redux/actions/DIR actions';
import {
    load_playlists,
    sample_display,
    update_params,
    clear_playlists,
} from '../../../redux/actions/PLAYLIST actions';
import './home.scss';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: true,
        };
    }

    componentDidMount() {
        if (this.props.DIR.set) {
            if(!this.props.PLAYLIST.K)
                this.props.load_playlists(this.props.DIR.path);
            else
                this.props.update_params();
            this.props.sample_display();
            setTimeout(() => this.setState({ showLoader: false }), 2000);
        }
        // this.props.clear_DIR();
    }

    render() {
        if (!this.props.DIR.set) return <Redirect to='/' />;
        if (this.state.showLoader) return <Loader1 />;

        return (
            <>
                <div className='home--wrapper'>
                    <SideBar />
                    <div className='home'>
                        <PlaylistCards />
                        <div className='home__section'>
                            <TopList />
                            <RecentList />
                        </div>
                    </div>
                </div>
                <Player />
            </>
        );
    }
}
//==========================================================================
const mapStatesToProps = (store) => ({
    DIR: store.DIR,
    PLAYLIST: store.PLAYLIST,
    ERROR: store.ERROR,
});
//==========================================================================
export default connect(mapStatesToProps, {
    clear_DIR,
    load_playlists,
    sample_display,
    update_params,
    clear_playlists,
})(withRouter(Home));

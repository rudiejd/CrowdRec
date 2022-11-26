import React from 'react'
import SpotifyForm from './components/SpotifyForm';
import SpotifyAuth from './components/SpotifyAuth';
import ViewWidthText from './components/Text';


import { Container, Col} from 'react-bootstrap';   


export const Home = () => {
    if (window.location.href.indexOf("access") === -1) {
        return <React.Fragment>
            <Container>
                <ViewWidthText viewSize={6}><b><div class="col-lg-12">Crowd-sourced</div> music recommendations</b></ViewWidthText>
                <p className="lead">Dissatisfied with Spotify's recommendations? I was too; that's why I made this website. This site delivers recommendations based on 
                    <b> artist adjacency</b> above all.</p>
                    
                    <p class="lead">In other words,
                    <ul>
                        <li>you give me an artist</li>
                        <li>I select a bunch of playlists containing said artist at random</li>
                        <li>I tally up which other artists most frequently appear in these playlists</li>
                        <li>Ordering by frequency, I cut the other artists off</li>
                        <li>I come back to you with a playlist of one random song from each of these new artists</li>
                        <li>Hopefully you like it!!</li>
                    </ul>
                </p>
                <Col sm={12} className="d-flex justify-content-sm-center align-items-sm-center">
                    <SpotifyAuth></SpotifyAuth>
                </Col>
                
            </Container>
            </React.Fragment>
    } else {
        return <Container className="p-5">
            <SpotifyForm />
        </Container>
    }
}

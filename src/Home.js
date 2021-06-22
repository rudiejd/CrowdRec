import React from 'react'
import SpotifyForm from './components/SpotifyForm';
import SpotifyAuth from './components/SpotifyAuth';
import Text from './components/Text';


import { Container } from 'react-bootstrap';   


export const Home = () => {
    if (window.location.href.indexOf("access") === -1) {
        return <React.Fragment>
            <Container className="p-lg-5">
                    <Text className="p-lg-5">
                        <h1 className="mb-4">Crowd-sourced Spotify recommendations</h1>
                        <p className="lead">Unsatisfied with your spotify recommendations? I was too; that's why I made this website. This site delivers recommendations based on 
                            <b> playlist adjacency</b> above all. That is, I give you a set of new artists who appear in playlists with a given artist at a high frequency,
                            all ranked by the number of times they are in the same playlists as the artist you entered. 
                        </p>
                        <SpotifyAuth></SpotifyAuth>
                    </Text>
                
            </Container>
            </React.Fragment>
    } else {
        return <Container className="p-5">
            <SpotifyForm />
        </Container>
    }
}

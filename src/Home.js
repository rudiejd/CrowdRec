import React from 'react'
import SpotifyForm from './components/SpotifyForm';
import SpotifyAuth from './components/SpotifyAuth';


import { Col, Row, Jumbotron, Container } from 'react-bootstrap';   
export const Home = () => {
        return <React.Fragment>
                <Jumbotron className="text-justify">
                    <Container>
                        <h1 className="display-4">Crowd-sourced Spotify recommendations</h1>
                        <p>Unsatisfied with your spotify recommendations? I was too; that's why I made this website. This site delivers recommendations based on 
                            <b> playlist adjacency</b> above all. That is, I give you a set of new artists who appear in playlists with a given artist at a high frequency,
                            all ranked by the number of times they are in the same playlists as the artist you entered. 
                        </p>
                        <SpotifyAuth></SpotifyAuth>
                    </Container>
                </Jumbotron>
            <Container>
                
                <Row>
                    <Col lg={6} className="offset-lg-3">
                        
                        <SpotifyForm />
                    </Col>
                </Row>
            </Container>
            </React.Fragment>
}

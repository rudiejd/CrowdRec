import React from 'react'
import { Container, Row, Col, Image} from 'react-bootstrap'
import {PaypalDonate} from './components/PaypalDonate';


export const About = () => (
        <React.Fragment>
            <Container>
                <Row>
                    <Col xs={12}>
                    <header className="text-center">
                        <h1 className="font-weight-bold text-white">Hi, I'm JD Rudie.</h1>
                    </header>
                    </Col>
 
                </Row>
                <Row>
                    <Col xs={12} className="text-justify text-wrap">
                        <Image src="https://i.pinimg.com/originals/10/71/a6/1071a68d76b0673337b84c84d37c8100.gif" className="float-left">
                        </Image>
                        <p>I am a junior Mathematics and Computer Science student at Miami University in Oxford, Ohio. I intern at Wolfram Research in the Enterprise Data Analysis department.</p>
                        <p>I've been enthusiastic about music my whole life. Some of my all time favorites are David Bowie, Run The Jewels, Sufjan Stevens, MF DOOM, OutKast, Parquet Courts, Deafheaven, Megadeth, and Fiona Apple. </p>
                        <p>My social media is linked below just in case you're feeling like donating some clout. I also greatly appreciate PayPal donos since I'm a struggling college student.</p>
                        
                  </Col>
                </Row>
                <Row className="mt-lg-5">

                        <Col lg={4} align="center">
                            	<a href="https://github.com/rudiejd">
					<Image src="github.png"></Image>
				</a>
                        </Col>
                        <Col align="center">
				<a href="https://open.spotify.org/user/rudebowski">
                        		<Image src="spotify.svg" width="120" height="120"></Image>
                        	</a>
			</Col>
                        <Col align="center">
				<a href="https://instagram.com/jd_rude">
                        		<Image src="insta.svg" width="120" height="120"></Image>
                        	</a>
			</Col>
                </Row>
                <Row Col md={2} className="offset-md-5 mt-5">
                    <PaypalDonate />
                </Row>
            </Container>
        </React.Fragment>
)  

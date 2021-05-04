//this component will get the spotlight from the provider and display the spotlight
//must have nested if clause for the items that are nullable

//list out all of the links
import React, { useContext, useEffect, useState } from "react"
import { HomepageContext } from "../../providers/HomepageProvider"
import HomepageResourceLinksCard from './HomepageResourceLinksCard'
import { Col, Row, Container } from 'reactstrap';

const HelpfulResourceList = () => {
    const { getSpotlight, setSpotlight } = useContext(HomepageContext);

    useEffect(() => {
        getSpotlight();
    }, []);


    return (

        <Container>
            <Col xs="8" className="container">
                <div className="row justify-content-center">
                    <div className="cards-column">

                        <h1 style={{ textAlign: 'center' }}>May's Spotlight</h1>

                        {homepageResourceLinks.map((link) => {
                            <HomepageResourceLinksCard key={link.id} link={link} />

                        })}
                    </div>
                </div>
            </Col>

        </Container>

    )

}

export default HelpfulResourceList;
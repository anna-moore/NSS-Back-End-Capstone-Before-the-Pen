//list out all of the links
import React, { useContext, useEffect, useState } from "react"
import { HomepageContext } from "../../providers/HomepageProvider"
import HomepageResourceLinksCard from './HomepageResourceLinksCard'
import { Col, Row, Container } from 'reactstrap';

const HelpfulResourceList = () => {
    const { getResourceLinks, homepageResourceLinks } = useContext(HomepageContext);

    useEffect(() => {
        getResourceLinks();
    }, []);


    return (

        <Container>
            <Row>
                <Col xs="8" className="container">
                    <div className="row justify-content-center">
                        <div className="cards-column">

                            <h1 style={{ textAlign: 'center' }}>Helpful Links/ Getting Started</h1>

                            {homepageResourceLinks.map((link) => {
                                <HomepageResourceLinksCard key={link.id} link={link} />

                            })}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>

    )

}

export default HelpfulResourceList;
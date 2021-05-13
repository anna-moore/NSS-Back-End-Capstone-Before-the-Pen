//this module will bring together both the spotlight and the resource links
//this module contains useffects to get both items
//return statement calling both functions

import React, { useEffect, useContext } from "react";
import SpotLightListCard from "./Spotlight";
import { Row, Col, Container, Card, CardBody } from "reactstrap"
import HomepageResourceLinksList from "./HomepageResourceLinksList";
import { HomepageContext } from "../../providers/HomepageProvider";

export const Homepage = () => {
    const { getResourceLinks, getSpotlight } = useContext(HomepageContext);

    //why is this use effect necessary??
    useEffect(() => {
        getResourceLinks();
        getSpotlight();
    }, [])

    //displays both components of the home page
    return (
        <Container className="m-3">
            <Row>
                <Col lg="9">
                    <SpotLightListCard />
                </Col>

                <Col lg="3" c>
                    {/* <CardBody> */}
                    <HomepageResourceLinksList />
                    {/* </CardBody> */}
                </Col>
            </Row>
        </Container>
    )
}

export default Homepage;
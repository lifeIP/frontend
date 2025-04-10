import { Accordion, AccordionDetails, AccordionSummary, Card, CardContent, Skeleton, Typography } from '@mui/material';

import React, {
    useState 
} from 'react';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';



export default function History() {
    const [is_load, setLoad] = useState(false)
    return (
        <Card sx={{ borderRadius: "12px", width: "51.05vw", minHeight: "100px" }}>
            <CardContent>
                <Typography gutterBottom variant="h3" component="div" textAlign="center">
                    История
                </Typography>
            </CardContent>
            <CardContent>
                {!is_load ? (
                    <Skeleton animation="wave" variant="rectangular" />
                ) : (
                    <div>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ArrowDownwardIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >
                                <Typography component="span">Accordion 1</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                    malesuada lacus ex, sit amet blandit leo lobortis eget.
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
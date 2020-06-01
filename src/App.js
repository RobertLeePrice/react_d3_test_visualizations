import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import HeaderNavbar from './components/navbar/navbar';
import SimpleCard from './components/base/simpleCard/simpleCard';
import PolarChart from './visualizations/d3/polarChart/polarChart';
import './App.scss';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 200,
  },
}));

let rowHeight = 325;

function App() {
  const classes = useStyles();
  return (
    <>

    <HeaderNavbar />

    <main className={classes.content}>
        <div className={classes.appBarSpacer}></div>
        <Container maxWidth="xl" className={classes.container}>
        <Grid container spacing={0} >
          <Grid item xs={12} sm={12} md={6} lg={4}>
              <SimpleCard title='Testing Polar Charts' height={400}>
                <PolarChart data={[
                  {'angularCoord': 25, 'radialCoord': 1, 'size': 10, 'name': 'Label 1', 'status': 'On Time'},
                  {'angularCoord': 105, 'radialCoord': 0.8, 'size': 10, 'name': 'Label 2', 'status': 'On Time'},
                  {'angularCoord': 266, 'radialCoord': 1, 'size': 10, 'name': 'Label 3', 'status': 'Delayed'},
                  {'angularCoord': 8, 'radialCoord': 0.2, 'size': 20, 'name': 'Label 4', 'status': 'Delayed'},
                  {'angularCoord': 189, 'radialCoord': 1, 'size': 25, 'name': 'Label 5', 'status': 'On Time'},
                  {'angularCoord': 305, 'radialCoord': 0.6, 'size': 15, 'name': 'Label 6', 'status': 'On Time'},
                ]} id={'F'} />
              </SimpleCard>
          </Grid>
        </Grid>
      </Container>
    </main>
    </>
  );
}

export default App;

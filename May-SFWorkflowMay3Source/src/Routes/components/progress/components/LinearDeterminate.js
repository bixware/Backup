/**
* Linear Determinate ProgressBar
*/
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function LinearDeterminate(props){
   const [progress, setProgress] = useState(0);

   useEffect(() => {
      const timer = setInterval(() => {
         setProgress((oldProgress) => {
            if (oldProgress === 100) {
               return 0;
            }
            const diff = Math.random() * 10;
            return Math.min(oldProgress + diff, 100);
         });
      }, 500);

      return () => {
         clearInterval(timer);
      };
   }, []);

  
   const { classes } = props;
   return (
      <div className={classes.root}>
         <LinearProgress variant="determinate" value={progress} />
        <br />
         <LinearProgress color="secondary" variant="determinate" value={progress} />
      </div>
   );
}

LinearDeterminate.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearDeterminate);
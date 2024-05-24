/**
 * Linear Buffer ProgressBar
 */
import React, { useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = {
   root: {
      flexGrow: 1,
   }
};

function LinearBuffer(props) {
   const [progress, setProgress] = useState(0);
   const [buffer, setBuffer] = useState(10);

   const progressRef = useRef(() => { });
   useEffect(() => {
      progressRef.current = () => {
         if (progress > 100) {
            setProgress(0);
            setBuffer(10);
         } else {
            const diff = Math.random() * 10;
            const diff2 = Math.random() * 10;
            setProgress(progress + diff);
            setBuffer(progress + diff + diff2);
         }
      };
   });

   useEffect(() => {
      const timer = setInterval(() => {
         progressRef.current();
      }, 500);

      return () => {
         clearInterval(timer);
      };
   }, []);

   const { classes } = props;
   return (
      <div className={classes.root}>
         <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
         <br />
         <LinearProgress color="secondary" variant="buffer" value={progress} valueBuffer={buffer} />
      </div>
   );
}

LinearBuffer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LinearBuffer);

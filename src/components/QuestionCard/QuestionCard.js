import React, { useState } from 'react'
import { StarFillIcon } from '@mui/icons-material'
import { StarOutlineIcon } from '@mui/icons-material'


const QuestionCard = ({question,nextQuestion, total, questionNo, progress, checkUserAnswer,maxScore, score}) => {
  const[answered,setAnswered] = useState(" ")
  const[message,setMessage] = useState(" ")
 
  const handleAnswer = (ans) =>{
    setAnswered(ans);
    checkUserAnswer(ans);
    if(decodeURIComponent(question['correct_answer'])===ans){
      setMessage('Correct!')
    }
    else{
      setMessage('InCorrect!')
    }

  }

  function difficultyLevelChecker (){
    if(question['difficulty'] === 'hard'){
      return (
        <>
       {/* <StarFillIcon/>
       <StarFillIcon/>
       <StarFillIcon/> */}
       </>
      )
    }
    else if (question['difficulty'] === 'medium'){
      return (
        <>
       {/* <StarFillIcon/>
       <StarFillIcon/> */}
       {/* <StarOutlineIcon/> */}
       </>
      )
    }
    else if (question['difficulty'] === 'easy'){
      return (
        <>
       {/* <StarFillIcon/> */}
       {/* <StarOutlineIcon/>
       <StarOutlineIcon/> */}
       </>
      )
    } 
    else {
      return (
        <>
       {/* <StarOutlineIcon/>
       <StarOutlineIcon/>
       <StarOutlineIcon/> */}
       </>
      )
    } 
   }
  const classes = useStyles();
  return (<>
        <div className={classes.progressRoot}>

          <BorderLinearProgress
              className={classes.bar}
              variant="determinate"
              color="secondary"
              value={progress}
            />
        </div>

        <Card className={classes.root}>
          <CardActionArea>  
            <CardContent>
              <Typography variant="h5" component="h3">
                Question {questionNo} of {total}
              </Typography>
              <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                {decodeURIComponent(question['category'])}
              </Typography>
              { difficultyLevelChecker()}
              <Divider/>
              <Typography  variant="body1" color="textSecondary" component="p" className={classes.question}>
                {decodeURIComponent(question['question'])}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            { question['incorrect_answers'].map(key =>
                <Button variant={answered === decodeURIComponent(key)? "contained" :"outlined"} 
                        color="primary" key={decodeURIComponent(key)} 
                        onClick={()=>handleAnswer(decodeURIComponent(key))}
                        disabled={answered!==''?true : false}
                >
                        {decodeURIComponent(key)}
                </Button>
              )
            }
            <Button variant={answered === decodeURIComponent(question['correct_answer'])? "contained" :"outlined"} 
                    color="primary" key={decodeURIComponent(question['correct_answer'])} 
                    onClick={()=>handleAnswer(decodeURIComponent(question['correct_answer']))}
                    disabled={answered!==''?true : false}
            >
                  {decodeURIComponent(question['correct_answer'])}
            </Button>
          </CardActions>
          <Typography variant="h5" component="h3" className="message">
              {answered && message}
          </Typography>
            
          {answered!=='' && progress !==100? 
            <Button variant="contained" 
              className="next-button" 
              color="secondary" key="next" onClick={()=>{nextQuestion(); setAnswered('');}} 
              >
                Next Question
          </Button>
          
          : ''}
            

        </Card>
        <div className="score-wrapper">
          <p>Score: {score} %</p>
          <p>MaxScore: {maxScore} %</p> 
        </div>


        <div className={classes.progressRoot}>
          <BorderLinearProgress
              className={classes.bar}
              variant="determinate"
              color="secondary"
              value={score}
              valueBuffer={maxScore}
            />
        </div>
    </>
  );
}

export default QuestionCard
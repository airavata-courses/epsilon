import { Button, CircularProgress } from '@material-ui/core'
import React, {useState} from 'react'

function PlotResultsNasa() {
    const [loading, setLoading] = useState(false)
    
    let interval = null;
    let counter =  0;
    const api = () => {
        counter += 1
        return new Promise((resolve, reject) => {
            if (counter > 10) {
                resolve({'name': 'Abhinav'})
            } else {
                reject(null);
            }
        });
    }
    
    const getData = () => {
        console.log('getData');
        api().then(response => {
            console.log(response);
            if (interval){
                setLoading(false);
                clearInterval(interval)
            }
        }).catch(error => {
            console.log(error)
        })
    }
    
    const onClick = () => {
        setLoading(true)
        interval = setInterval(() => {
           getData()
        }, 1000)
    }
    
  return (
      <>
        <Button onClick = {()=> onClick()}>Click</Button>
        {loading ? <div><CircularProgress /></div> : null}
    </>
  )
}

export default PlotResultsNasa
import { Button, MenuItem, TextField } from '@mui/material';
import './Home.css';
import Categories from '../../Data/Categories';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorMessage, {} from '../../components/ErrorMessage/ErrorMessage';

const Home = ({name,setName,fetchQuestions}) => {
    const [category, setCategory] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [error, setError] = useState(false);

    const history = useNavigate();

    const handleSubmit = () => {
        if (!name || !category || !difficulty){
            setError(true);
            return;
        } else{
            setError(false);
            // fetch the questions
            fetchQuestions(category,difficulty);
            history("/test");
        }
    }
    return(
        <div className="content">
            <div className='settings'>
                <span className='settings-title'>Test Setting</span>

                <div className='settings-select'>

                    {error && <ErrorMessage> Please fill all the fileds</ErrorMessage>}
                    <TextField 
                    label="Enter Your Name" 
                    variant="outlined"  
                    style={{marginBottom:20}}
                    onChange={(e) => setName(e.target.value)}/>

                    <TextField select
                    label="Select Category" 
                    variant="outlined" 
                    style={{marginBottom:30}}
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}>
                        {
                            Categories.map( (cat) => (
                                <MenuItem key={cat.category} value={cat.value}>
                                    {cat.category}
                                </MenuItem>
                            ))
                        }
                        
                    </TextField>

                    <TextField
                    select
                    label="Select Difficulty"
                    style={{marginBottom:30}}
                    variant="outlined"
                    onChange={(e) => setDifficulty(e.target.value)}
                    value={difficulty}>
                        <MenuItem key="Easy" value="easy">
                            Easy
                        </MenuItem>
                        <MenuItem key="Medium" value="medium">
                            Medium
                        </MenuItem>
                        <MenuItem key="Hard" value="hard">
                            Hard
                        </MenuItem>
                    </TextField>

                    <Button 
                    variant='contained' 
                    color='primary' 
                    size='large'
                    onClick={handleSubmit}>
                        Start Test
                    </Button>
                </div>
            </div>
          
        </div>
    )
}
export default Home
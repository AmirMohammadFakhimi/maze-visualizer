import {styled} from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import FastForwardRoundedIcon from '@mui/icons-material/FastForwardRounded';
import {atom, useRecoilState} from "recoil";

const Input = styled(MuiInput)`
    width: 42px;
`;

export const visualizingSpeedState = atom<number>({
  key: 'visualizingSpeedState',
  default: 1
})

export default function SpeedControl() {
  const [visualizingSpeed, setVisualizingSpeed] = useRecoilState(visualizingSpeedState)
  const minSpeed = 1;
  const maxSpeed = 20;

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setVisualizingSpeed(newValue as number)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVisualizingSpeed(event.target.value === '' ? 0 : Number(event.target.value))
  }

  const handleBlur = () => {
    if (visualizingSpeed < minSpeed)
      setVisualizingSpeed(minSpeed)
    else if (visualizingSpeed > maxSpeed)
      setVisualizingSpeed(maxSpeed)
  }

  return (
    <Box className={'flex justify-between items-start mt-5 gap-10 border-t-2 border-black pt-5'}>
      <div className={'text-lg font-semibold'}>
        Speed:
      </div>

      <Grid container spacing={2}>
        <Grid item>
          <FastForwardRoundedIcon/>
        </Grid>

        <Grid item xs>
          <Slider
            value={typeof visualizingSpeed === 'number' ? visualizingSpeed : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={minSpeed}
            max={maxSpeed}
          />
        </Grid>

        <Grid item>
          <Input
            value={visualizingSpeed}
            size="small"
            onChange={handleInputChange}
            onBlur={handleBlur}
            inputProps={{
              step: 1,
              min: minSpeed,
              max: maxSpeed,
              type: 'number',
              'aria-labelledby': 'input-slider',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
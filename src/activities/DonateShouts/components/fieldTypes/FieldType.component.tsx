import {
    Autocomplete,
    Box,
    Checkbox,
    FormControl,
    FormGroup,
    FormControlLabel,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from '@mui/material';

interface FieldTypeProps {
    answerKey: string;
    options: Array<string>;
    questionType: string;
    question?: string;
    getCurVal: (key: string) => string;
    handleChange: (key: string, value: any, keysToClear: string) => void;
    keysToClear: string; // these are the answer keys that need to be cleared if the answer to this question changes
}

export const FieldType = ({
    answerKey,
    options,
    questionType,
    question,
    getCurVal,
    handleChange,
    keysToClear,
}: FieldTypeProps) => {
    switch (questionType) {
        case 'radio': {
            return (
                <FormControl sx={{ marginBottom: 2 }} component="fieldset">
                    <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        {question}
                    </Typography>
                    <RadioGroup
                        sx={{ display: 'inline-flex' }}
                        onChange={(e) =>
                            handleChange(answerKey, e.target.value, keysToClear)
                        }
                        value={getCurVal(answerKey)}
                        name="radio-buttons-group"
                    >
                        {options.map((option: any) => {
                            return (
                                <Box key={option} sx={{ marginBottom: 1 }}>
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        control={<Radio />}
                                        label={option}
                                    />
                                </Box>
                            );
                        })}
                    </RadioGroup>
                </FormControl>
            );
        }
        case 'text': {
            return (
                <>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: 2 }}>
                        {question}
                    </Typography>
                    <TextField
                        autoFocus
                        label={'Type an answer'}
                        sx={{ width: '25ch' }}
                        value={getCurVal(answerKey) || ''}
                        onChange={(e) =>
                            handleChange(answerKey, e.target.value, keysToClear)
                        }
                        inputProps={{
                            autoComplete: 'off', // disable autocomplete and autofill
                        }}
                    />
                </>
            );
        }
        case 'skipCheckbox': {
            return (
                <FormControl sx={{ marginBottom: 2 }}>
                    {question && (
                        <Typography
                            sx={{ fontWeight: 'bold', marginBottom: 1 }}
                        >
                            {question}
                        </Typography>
                    )}
                    <FormGroup sx={{ display: 'inline-flex' }}>
                        {options.map((option: any) => {
                            return (
                                <Box key={option}>
                                    <FormControlLabel
                                        key={option}
                                        value={option}
                                        label={option}
                                        control={
                                            <Checkbox
                                                checked={
                                                    option ===
                                                    getCurVal(answerKey)
                                                }
                                                onChange={(e) =>
                                                    handleChange(
                                                        answerKey,
                                                        getCurVal(answerKey) ===
                                                            option
                                                            ? null
                                                            : option,
                                                        keysToClear
                                                    )
                                                }
                                            />
                                        }
                                    />
                                </Box>
                            );
                        })}
                    </FormGroup>
                </FormControl>
            );
        }
        case 'searchSelect': {
            return (
                <>
                    <Typography sx={{ fontWeight: 'bold', marginBottom: 1 }}>
                        {question}
                    </Typography>
                    <Autocomplete
                        disablePortal
                        value={getCurVal(answerKey) || null}
                        id="combo-box-demo"
                        options={options}
                        sx={{ maxWidth: 300, marginBottom: 2 }}
                        getOptionLabel={(option: any) => option}
                        renderOption={(props, option: any) => (
                            <Box component="li" {...props}>
                                {option}
                            </Box>
                        )}
                        isOptionEqualToValue={(option, value) =>
                            option === value ||
                            value === 'Prefer not to disclose'
                        }
                        onChange={(event, value) =>
                            handleChange(answerKey, value, keysToClear)
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Select the answer"
                                inputProps={{
                                    ...params.inputProps,
                                    autoComplete: 'off', // disable autocomplete and autofill
                                }}
                            />
                        )}
                    />
                </>
            );
        }
        default:
            return <></>;
    }
};

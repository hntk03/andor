import MyHead from '../components/myhead';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import { Container, RadioGroup, Stack, Radio, Input, Button, CloseButton, Textarea } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState('1')
	const conditionNumMin = 2
	const conditionNumMax = 5
	const [conditions, setConditions] = useState(Array(conditionNumMin).fill(''))
	const [text, setText] = useState('')

const onChangeCondition = (e) => {
	const data = conditions.slice()
	const index = Number(e.target.id) - 1
	const input = e.target.value

	data[index] = input

	setConditions(data)
	generate(value, data)
}

const onChangeType = (e) => {
	setValue(e)
	generate(e, conditions)
}

const onClickAdd = () => {
	if(conditions.length+1 > conditionNumMax){
		return 
	}

	conditions.push('')

	generate(value, conditions)
}

const onClickCloseButton = (e) => {
	if(conditions.length-1 < conditionNumMin){
		return
	}

	const delIndex = Number(e.target.id) - 1
	const copyConditions = conditions.slice()
	copyConditions.splice(delIndex, 1)

	setConditions(copyConditions)
	generate(value, copyConditions)
}

const generate = (value, conditions) =>{
	let type = ""
	if(value == 1){
		type = "AND"
	} 
	else{
		type = "OR";
	}

	const spaces = makeSpace(type)

	const list = []
	const first = `${type} ┬ ${conditions[0]}`
	const end = `${spaces} └  ${conditions[conditions.length-1]}`

	for(let i=1;i<conditions.length-1;i++){
		const item = `${spaces}  ├ ${conditions[i]}`
		list.push(item)
	}

	list.unshift(first)
  list.push(end)

	setText(list.join('\n'))
}

const makeSpace = (type) => {
	return Array(type.length+4).fill(" ").join("")
}

const TextBox = () => {
	const list = []
	for(let i=0; i<conditions.length; i++){
		list.push(Row(i))
	}

	return list
}

const Row = (i) => {
	const placeholder = '条件' + (i+1)
	return (
		<Stack key={`stack_${i+1}`} direction='row'>
		<Input key={`input_${i+1}`} id={i+1} placeholder={placeholder} size='md' onChange={onChangeCondition} value={conditions[i]} />
		{conditions.length != 2 && <CloseButton key={`closeButton_${i+1}`} id={i+1} onClick={onClickCloseButton} />}
		</Stack>
	)
}


  return (
		<ChakraProvider>
    <div>
			<Container>

			<MyHead />

      <main>
			<Header />
			<RadioGroup onChange={onChangeType} value={value}>
				<Stack direction='row'>
					<Radio value='1'>AND</Radio>
					<Radio value='2'>OR</Radio>
				</Stack>
			</RadioGroup>

			<Stack spacing={3}>
				{TextBox()}
			</Stack>

		{ conditions.length != conditionNumMax && <Button mt={3} onClick={onClickAdd}>追加</Button>}

			<Textarea mt={3} h='calc(30vh)' placeholder='' value={text} isReadOnly={true} size="lg" />

			<Footer />
      </main>
			</Container>
		</div>
		</ChakraProvider>
  );
}

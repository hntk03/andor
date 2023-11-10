import MyHead from '../components/myhead';
import Header from '../components/header';
import Footer from '../components/footer';
import styles from '../styles/Home.module.css';
import { Container, RadioGroup, Stack, Radio, Input, Button, CloseButton, Textarea, useClipboard } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const [type, setType] = useState('1')
	const conditionNumMin = 2
	const conditionNumMax = 5
	const [conditions, setConditions] = useState(Array(conditionNumMin).fill(''))
	const { onCopy, value, setValue, hasCopied } = useClipboard('');

const onChangeCondition = (e) => {
	const data = conditions.slice()
	const index = Number(e.target.id) - 1
	const input = e.target.value

	data[index] = input

	setConditions(data)
	generate(type, data)
}

const onChangeType = (e) => {
	setType(e)
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
	let t = ""
	if(type == 1){
		t = "AND"
	} 
	else{
		t = "OR";
	}

	const spaces = makeSpace(t)

	const list = []
	const first = `${t} ┬ ${conditions[0]}`
	const end = `${spaces} └  ${conditions[conditions.length-1]}`

	for(let i=1;i<conditions.length-1;i++){
		const item = `${spaces}  ├ ${conditions[i]}`
		list.push(item)
	}

	{/* 先頭と末尾に追加 */}
	list.unshift(first)
  list.push(end)

	setValue(list.join('\n'))
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
		<Input key={`input_${i+1}`} id={i+1} width='480px' placeholder={placeholder} size='md' onChange={onChangeCondition} value={conditions[i]} />
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
			<RadioGroup onChange={onChangeType} value={type}>
				<Stack direction='row'>
					<Radio value='1'>AND</Radio>
					<Radio value='2'>OR</Radio>
				</Stack>
			</RadioGroup>

			<Stack spacing={3}>
				{TextBox()}
			</Stack>

		{ conditions.length != conditionNumMax && <Button mt={3} onClick={onClickAdd}>追加</Button>}

			<Textarea mt={1} h='calc(30vh)' placeholder='' value={value} isReadOnly={true} size="lg" />
			<Button onClick={onCopy} mt={1}>{ hasCopied ? "Copied!":"Copy"}</Button>

			<Footer />
      </main>
			</Container>
		</div>
		</ChakraProvider>
  );
}

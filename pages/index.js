import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Container, RadioGroup, Stack, Radio, Input, Button, Textarea } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const conditionNumMax = 5
	const conditionNumMin = 2
	const [value, setValue] = useState('1')
	const [condition1, setCondition1] = useState('')
	const [condition2, setCondition2] = useState('')
	const [conditions, setConditions] = useState(Array(conditionNumMax).fill(''))
	const [text, setText] = useState()
	const [conditionNum, setConditionNum] = useState(conditionNumMin)

const onChangeCondition1 = (e) => {
	console.log(e)
	setCondition1(e.target.value)
	generate(value)
}

const onChangeCondition = (e) => {
	const data = conditions.slice()
	const index = Number(e.target.id) - 1
	const input = e.target.value

	data[index] = input

	setConditions(data)
	generate(value, data)
}

const onChangeCondition2 = (e) => {
	setCondition2(e.target.value)
	generate(value)
}

const onChangeType = (e) => {
	setValue(e)
	generate(e, conditions)
}

const onClickAdd = () => {
	const num = Math.min(conditionNum+1, conditionNumMax)
	setConditionNum(num)
}

const onClickDelete = () => {
	const num = Math.max(conditionNum-1, conditionNumMin)
	setConditionNum(num)
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
	const first = type + " ┬ " + conditions[0]
	const end = spaces + " └ " + conditions[conditionNum-1]

	for(let i=1;i<conditionNum-1;i++){
		const item = spaces + "  ├ " + conditions[i]
		list.push(item)
	}

	list.unshift(first)
  list.push(end)


	setText(list.join('\n'))
	// const first = type + " ┬ " + condition1
	// const end = makeSpace(type) + " └ " + condition2
	// const content = [first, end].join("\n")
	// setText(content)
}

const makeSpace = (type) => {
	return Array(type.length+4).fill(" ").join("")
}

const hoge = () => {
	const list = []
	for(let i=0; i<conditionNum; i++){
		const placeholder = '条件' + (i+1)
		list.push(<Input key={i+1} id={i+1} placeholder={placeholder} size='md' onChange={onChangeCondition} value={conditions[i]} />)
	}
	return list
}

const tmp = () => {
	// <Input placeholder='条件1' size='md' onChange={onChangeCondition1} value={condition1} />
	// <Input placeholder='条件2' size='md' onChange={onChangeCondition2} value={condition2} />
}

  return (
		<ChakraProvider>
    <div>
			<Container>
      <Head>
        <title>AND OR Format</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
			<RadioGroup onChange={onChangeType} value={value}>
				<Stack direction='row'>
					<Radio value='1'>AND</Radio>
					<Radio value='2'>OR</Radio>
				</Stack>
			</RadioGroup>

			<Stack spacing={3}>
				{hoge()}
			</Stack>

			<Stack direction='row'>
				<Button onClick={onClickAdd}>追加</Button>
				<Button onClick={onClickDelete}>削除</Button>
			</Stack>

			<Textarea h='calc(30vh)' placeholder='' value={text} isReadOnly={true} size="lg" />

      </main>
			</Container>
		</div>
		</ChakraProvider>
  );
}

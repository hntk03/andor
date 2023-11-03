import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { Container, RadioGroup, Stack, Radio, Input, Button, Textarea } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import { useState } from 'react';

export default function Home() {
	const [value, setValue] = useState('1')
	const [condition1, setCondition1] = useState('')
	const [condition2, setCondition2] = useState('')
	const [text, setText] = useState()
	const [conditionNum, setConditionNum] = useState(2)

const onChangeCondition1 = (e) => {
	setCondition1(e.target.value)
	generate(value)
}

const onChangeCondition2 = (e) => {
	setCondition2(e.target.value)
	generate(value)
}

const onChangeType = (e) => {
	console.log(e)
	setValue(e)
	generate(e)
}

const generate = (value) =>{
	let type = ""
	if(value == 1){
		type = "AND"
	} 
	else{
		type = "OR";
	}

	const first = type + " ┬ " + condition1
	const end = makeSpace(type) + " └ " + condition2
	const content = [first, end].join("\n")
	setText(content)
}

const makeSpace = (type) => {
	return Array(type.length+4).fill(" ").join("")
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
				<Input placeholder='条件1' size='md' onChange={onChangeCondition1} value={condition1} />
				<Input placeholder='条件2' size='md' onChange={onChangeCondition2} value={condition2} />
			</Stack>

			<Textarea placeholder='' value={text} isReadOnly={true} size="lg" />

      </main>
			</Container>
		</div>
		</ChakraProvider>
  );
}

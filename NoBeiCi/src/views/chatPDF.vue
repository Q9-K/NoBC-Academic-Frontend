<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import NavigateBar from '../components/NavigateBar.vue';
import Search from '../components/SearchBar.vue';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai'
// import {HuggingFaceEmbeddings} from 'langchain/embeddings'
import { Chroma } from 'langchain/vectorstores/chroma'
import { CharacterTextSplitter } from 'langchain/text_splitter'
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf'
import { RetrievalQAChain } from 'langchain/chains'

// 根据文件类型来定义一个 loader，不同的 loader 能够解析不同的文件内容，最终都会解析为一个大文本
const file_path= ref("./GSLB.pdf")
localStorage.setItem('OPENAI_API_KEY', 'sess-EGczvLEBxQvH5pRd0wPAct69DECgizG6kxrxwI6x');
const loader =  new PDFLoader(file_path) 
// 定义文本分块的规则，这里用了一个很简单的规则，按照默认的分隔符来切割文本，使得每一段不超过 1000 个字符
const splitter = new CharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 0 });
const chunks = loader.loadAndSplit(splitter);

// 定义文本的 embedding，也就是如何把文本转换为向量。默认使用 sentence-transformers 这个免费的模型，也可以使用 OpenAI 提供的收费接口
const embeddings = new OpenAIEmbeddings({openAIApiKey:'sess-EGczvLEBxQvH5pRd0wPAct69DECgizG6kxrxwI6x'});

// 实现一个本地的文档语义搜索，在存入一堆 chunk 之后，能够随时检索和问题最相关的一些 chunk。Chroma 就是一个比较流行的 vector store
const db = Chroma.fromDocuments(chunks, embeddings);

// 本地搜索到的 chunk 会作为 context，和问题一起提交给 LLM 来处理。我们当然要使用 ChatGPT 模型了，比 GPT-3.0 又好又便宜
const llm = new ChatOpenAI({ temperature: 0 ,openAIApiKey:'sess-EGczvLEBxQvH5pRd0wPAct69DECgizG6kxrxwI6x'});

// chain 是 LangChain 里的概念，其实就相当于定义了一个流程，这里我们提供的参数就是文档语义搜索工具以及 LLM
const chain = RetrievalQAChain.fromChainType(llm, db.asRetriever());

// 下面就比较简单了，不断读取问题然后执行 chain
onMounted(() =>{
  console.log(embeddings)
  chain.run("hello")
})
</script>
<template>
  <div class="main">
    <NavigateBar class="navbar"></NavigateBar>
    <Search class="search" :info="inform" @formDataChange="handleChildEvent"></Search>
  </div>
</template>
<style scoped> 
.main {
   width: 100%;
   height: auto;
   display: flex;
   flex-direction: column;
   justify-content: start;
   text-align: start;
 }

 .navbar {}

 .search {

 }
</style>
"use client"
import { useState } from 'react'

interface SearchResult {
  title: string;
  description: string;
  image_url: string;
}

export default function Home() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [searchAlgorithm, setSearchAlgorithm] = useState<'vsm' | 'bm25'>('vsm')

  const handleSearch = async () => {
    // Determine the endpoint based on the selected algorithm
    const endpoint = searchAlgorithm === 'vsm' 
      ? `https://web-production-6cb6.up.railway.app/search?query=${encodeURIComponent(query)}`
      : `https://web-production-6cb6.up.railway.app/search/bm25?query=${encodeURIComponent(query)}`
    
    try {
      const res = await fetch(endpoint)
      const data = await res.json()
      console.log(data)
      setResults(data.results)
    } catch (error) {
      console.error('Search failed:', error)
      // Optionally set some error state here
    }
  }

  const handleAlgorithmChange = (algorithm: 'vsm' | 'bm25') => {
    setSearchAlgorithm(algorithm)
    // Optionally trigger search immediately when changing algorithm
    // if (query.trim()) handleSearch()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-end p-4 space-x-4">
        <a href="#" className="text-sm text-gray-600 hover:underline">Gmail</a>
        <a href="#" className="text-sm text-gray-600 hover:underline">Images</a>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <button className="px-4 py-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Sign in
        </button>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-20 mb-4">
        <h1 className="text-5xl font-bold text-center ">
          <span className="text-blue-500">F</span>
          <span className="text-red-500">r</span>
          <span className="text-yellow-500">o</span>
          <span className="text-blue-500">g</span>
          <span className="text-green-500">l</span>
          <span className="text-red-500">e</span>
          
        </h1>
        <div className="text-center text-gray-600 mb-8 mt-2">  (because when it doesn't know it just shows frogs)</div>
        
        <div className="relative w-full max-w-2xl mb-8">
          <div className="flex items-center w-full p-3 border border-gray-200 rounded-full hover:shadow-md">
            <svg className="w-5 h-5 ml-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              value={query} 
              onChange={e => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-grow px-4 py-1 outline-none text-gray-600" 
              placeholder="Search frogs..." 
            />
            {query && (
              <button 
                onClick={() => setQuery('')}
                className="p-1 mr-2 text-gray-400 rounded-full hover:bg-gray-100"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="flex justify-center mt-6 space-x-3">
        <button 
          onClick={() => {
            handleAlgorithmChange('vsm')
            handleSearch()
          }}
          className={`px-4 py-2 text-sm rounded hover:border ${
            searchAlgorithm === 'vsm' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          VSM (default)
        </button>
        <button 
          onClick={() => {
            handleAlgorithmChange('bm25')
            handleSearch()
          }}
          className={`px-4 py-2 text-sm rounded hover:border ${
            searchAlgorithm === 'bm25' 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          BM25
        </button>
      </div>
        </div>

        {/* Results */}
        <div className="w-full max-w-2xl">
          {results.map((result, i) => (
            <div key={i} className="mb-8">
              <div className="group">
                <a href={result.image_url} target="_blank" rel="noopener noreferrer">
                  <h3 className="text-xl text-blue-700 group-hover:underline">{result.title}</h3>
                </a>
                <a href={result.image_url} target="_blank" rel="noopener noreferrer" className="text-green-700 text-sm">
                  {result.image_url.split('/').slice(0, 3).join('/')}
                </a>
                <p className="text-gray-600 text-sm">{result.description}</p>
              </div>
              <div className="mt-2">
                <img 
                  src={result.image_url} 
                  alt={result.title} 
                  className="object-cover h-48 rounded border border-gray-200"
                />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      {/* <footer className="absolute bottom-0 w-full bg-gray-100 text-sm text-gray-600">
        <div className="px-8 py-3 border-b border-gray-300">
          <p>United States</p>
        </div>
        <div className="flex flex-col px-8 py-3 md:flex-row md:justify-between">
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">About</a>
            <a href="#" className="hover:underline">Advertising</a>
            <a href="#" className="hover:underline">Business</a>
            <a href="#" className="hover:underline">How Search works</a>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Terms</a>
            <a href="#" className="hover:underline">Settings</a>
          </div>
        </div>
      </footer> */}
    </div>
  )
}
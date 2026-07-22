# Vector DB Provider

`vector-db` supports vector storage and similarity search with a local in-memory backend.

## Service provider

- `VectorDbServiceProvider`

## Contract and implementations

- `VectorDbProvider` -> `LocalVectorDbProvider`

## Environment variables

- None required by default.

## CLI discovery

```bash
koupper provider info vector-db
```

## Usage example

```kotlin
import com.koupper.shared.annotations.Export
import com.koupper.providers.vectordb.VectorDbProvider
import com.koupper.container.app

@Export
val searchSimilar: () -> String = {
    val db = app.getInstance(VectorDbProvider::class)
    
    db.store(
        id = "doc-1",
        vector = listOf(0.1, 0.5, 0.3),
        metadata = mapOf("title" to "Getting Started")
    )
    
    val results = db.search(
        query = listOf(0.2, 0.4, 0.3),
        topK = 5
    )
    "Found ${results.size} similar documents"
}
```

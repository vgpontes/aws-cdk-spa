# API Reference <a name="API Reference" id="api-reference"></a>

## Constructs <a name="Constructs" id="Constructs"></a>

### SinglePageApplication <a name="SinglePageApplication" id="aws-cdk-spa.SinglePageApplication"></a>

#### Initializers <a name="Initializers" id="aws-cdk-spa.SinglePageApplication.Initializer"></a>

```typescript
import { SinglePageApplication } from 'aws-cdk-spa'

new SinglePageApplication(scope: Construct, id: string, props: SinglePageApplicationProps)
```

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-spa.SinglePageApplication.Initializer.parameter.scope">scope</a></code> | <code>constructs.Construct</code> | *No description.* |
| <code><a href="#aws-cdk-spa.SinglePageApplication.Initializer.parameter.id">id</a></code> | <code>string</code> | *No description.* |
| <code><a href="#aws-cdk-spa.SinglePageApplication.Initializer.parameter.props">props</a></code> | <code><a href="#aws-cdk-spa.SinglePageApplicationProps">SinglePageApplicationProps</a></code> | *No description.* |

---

##### `scope`<sup>Required</sup> <a name="scope" id="aws-cdk-spa.SinglePageApplication.Initializer.parameter.scope"></a>

- *Type:* constructs.Construct

---

##### `id`<sup>Required</sup> <a name="id" id="aws-cdk-spa.SinglePageApplication.Initializer.parameter.id"></a>

- *Type:* string

---

##### `props`<sup>Required</sup> <a name="props" id="aws-cdk-spa.SinglePageApplication.Initializer.parameter.props"></a>

- *Type:* <a href="#aws-cdk-spa.SinglePageApplicationProps">SinglePageApplicationProps</a>

---

#### Methods <a name="Methods" id="Methods"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-spa.SinglePageApplication.toString">toString</a></code> | Returns a string representation of this construct. |

---

##### `toString` <a name="toString" id="aws-cdk-spa.SinglePageApplication.toString"></a>

```typescript
public toString(): string
```

Returns a string representation of this construct.

#### Static Functions <a name="Static Functions" id="Static Functions"></a>

| **Name** | **Description** |
| --- | --- |
| <code><a href="#aws-cdk-spa.SinglePageApplication.isConstruct">isConstruct</a></code> | Checks if `x` is a construct. |

---

##### ~~`isConstruct`~~ <a name="isConstruct" id="aws-cdk-spa.SinglePageApplication.isConstruct"></a>

```typescript
import { SinglePageApplication } from 'aws-cdk-spa'

SinglePageApplication.isConstruct(x: any)
```

Checks if `x` is a construct.

###### `x`<sup>Required</sup> <a name="x" id="aws-cdk-spa.SinglePageApplication.isConstruct.parameter.x"></a>

- *Type:* any

Any object.

---

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-spa.SinglePageApplication.property.node">node</a></code> | <code>constructs.Node</code> | The tree node. |

---

##### `node`<sup>Required</sup> <a name="node" id="aws-cdk-spa.SinglePageApplication.property.node"></a>

```typescript
public readonly node: Node;
```

- *Type:* constructs.Node

The tree node.

---


## Structs <a name="Structs" id="Structs"></a>

### SinglePageApplicationProps <a name="SinglePageApplicationProps" id="aws-cdk-spa.SinglePageApplicationProps"></a>

#### Initializer <a name="Initializer" id="aws-cdk-spa.SinglePageApplicationProps.Initializer"></a>

```typescript
import { SinglePageApplicationProps } from 'aws-cdk-spa'

const singlePageApplicationProps: SinglePageApplicationProps = { ... }
```

#### Properties <a name="Properties" id="Properties"></a>

| **Name** | **Type** | **Description** |
| --- | --- | --- |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.applicationName">applicationName</a></code> | <code>string</code> | Chosen name for single-page application. |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.websiteDirectory">websiteDirectory</a></code> | <code>string</code> | Path to folder containing contents of single-page application. |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.alternativeDomainNames">alternativeDomainNames</a></code> | <code>string[]</code> | Alternative domain names on your certificate. |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.domainName">domainName</a></code> | <code>string</code> | Domain name for website. |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.websiteErrorDocument">websiteErrorDocument</a></code> | <code>string</code> | The name of the error document (e.g. "404.html") for the website. |
| <code><a href="#aws-cdk-spa.SinglePageApplicationProps.property.websiteIndexDocument">websiteIndexDocument</a></code> | <code>string</code> | The name of the index document (e.g. "index.html") for the website. |

---

##### `applicationName`<sup>Required</sup> <a name="applicationName" id="aws-cdk-spa.SinglePageApplicationProps.property.applicationName"></a>

```typescript
public readonly applicationName: string;
```

- *Type:* string

Chosen name for single-page application.

---

##### `websiteDirectory`<sup>Required</sup> <a name="websiteDirectory" id="aws-cdk-spa.SinglePageApplicationProps.property.websiteDirectory"></a>

```typescript
public readonly websiteDirectory: string;
```

- *Type:* string

Path to folder containing contents of single-page application.

---

##### `alternativeDomainNames`<sup>Optional</sup> <a name="alternativeDomainNames" id="aws-cdk-spa.SinglePageApplicationProps.property.alternativeDomainNames"></a>

```typescript
public readonly alternativeDomainNames: string[];
```

- *Type:* string[]
- *Default:* No alternative names on certificate.

Alternative domain names on your certificate.

---

##### `domainName`<sup>Optional</sup> <a name="domainName" id="aws-cdk-spa.SinglePageApplicationProps.property.domainName"></a>

```typescript
public readonly domainName: string;
```

- *Type:* string
- *Default:* A website will be created with the default generated name (e.g., d111111abcdef8.cloudfront.net)

Domain name for website.

---

##### `websiteErrorDocument`<sup>Optional</sup> <a name="websiteErrorDocument" id="aws-cdk-spa.SinglePageApplicationProps.property.websiteErrorDocument"></a>

```typescript
public readonly websiteErrorDocument: string;
```

- *Type:* string
- *Default:* '404.html'

The name of the error document (e.g. "404.html") for the website.

---

##### `websiteIndexDocument`<sup>Optional</sup> <a name="websiteIndexDocument" id="aws-cdk-spa.SinglePageApplicationProps.property.websiteIndexDocument"></a>

```typescript
public readonly websiteIndexDocument: string;
```

- *Type:* string
- *Default:* 'index.html'

The name of the index document (e.g. "index.html") for the website.

---




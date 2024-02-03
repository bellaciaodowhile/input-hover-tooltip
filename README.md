# Input Focus 
Este input es un solo elemento en donde añadirá los atributos según quiere lo que aparezca.

Sus atributos obligatorios son:

```
title="Meta-Título" // String

type="input" // Recibe "input" o "textarea"

placeholder="Agrega un Mea-Título para tu noticia" //String

class="input__box"

minLength="60" // Cantidad mínima de carácteres

maxLength="80" // Cantidad máxima de carácteres

tooltip="true" // Recibe "true" o "false"
```

Atributos opcionales:

```
textsmall="Lorem ipsum..." // String - Mensaje

resume="Lorem ipsum..." // String - Descripción del tooltip

image="path" // Recibe la ruta de la imagen

image-axis="x" // Indica si quiere que la imagen esté en el eje X o Y. De manera horizontal o Vertical

button="Más Info" // Recibe el texto que tendrá el botón
```
## Uso 
### Básico

```HTML
<div 
  title="Descripción"
  type="textarea"
  placeholder="Agrega una descripción para tu sitio"
  class="input__box"
  minLength="100"
  maxLength="180"
  tooltip="true"
  textsmall="Lorem ipsum dolor sit amet con"
></div>
```
### Usando el tooltip

```HTML
<div 
  title="Meta-Título"
  type="input"
  placeholder="Agrega un Meta-Título para tu noticia"
  class="input__box"
  minLength="60"
  maxLength="80"
  tooltip="true"
  textsmall="Para mejorar el SEO de una página web debes asignarle una descripción sintética de menos de 140 caracteres."
  resume="Procura que esta descripción contenga la palabra clave o palabra más importante que define esta página web."
></div>
```
### Usando imagen 

``` HTML
<div 
  title="Meta-Título"
  type="input"
  placeholder="Agrega un Meta-Título para tu noticia"
  class="input__box"
  minLength="60"
  maxLength="80"
  tooltip="true"
  textsmall="Para mejorar el SEO de una página web debes asignarle una descripción sintética de menos de 140 caracteres."
  resume="Procura que esta descripción contenga la palabra clave o palabra más importante que define esta página web. Incorpora palabras complementarias que enriquezcan y acoten la búsqueda para obtener mejores resultados."
  image="https://media.istockphoto.com/id/1148185998/vector/digital-java-code-text-computer-software-coding-vector-concept-programming-coding-script.jpg?s=612x612&w=0&k=20&c=a828FuiFmSROCCmc7glJKr1DSxakHEvpdq58D_m3TVw="
></div>
```

### Usando el image-axis="x"

``` HTML
<div 
  title="Meta-Título"
  type="input"
  placeholder="Agrega un Meta-Título para tu noticia"
  class="input__box"
  minLength="60"
  maxLength="80"
  tooltip="true"
  textsmall="Para mejorar el SEO de una página web debes asignarle una descripción sintética de menos de 140 caracteres."
  resume="Procura que esta descripción contenga la palabra clave o palabra más importante que define esta página web. Incorpora palabras complementarias que enriquezcan y acoten la búsqueda para obtener mejores resultados."
  image="https://media.istockphoto.com/id/1148185998/vector/digital-java-code-text-computer-software-coding-vector-concept-programming-coding-script.jpg?s=612x612&w=0&k=20&c=a828FuiFmSROCCmc7glJKr1DSxakHEvpdq58D_m3TVw="
  image-axis="x"
></div>
```

### Usando todos los atributos

``` HTML
<div 
  title="Meta-Título"
  type="input"
  placeholder="Agrega un Meta-Título para tu noticia"
  class="input__box"
  minLength="60"
  maxLength="80"
  tooltip="true"
  textsmall="Para mejorar el SEO de una página web debes asignarle una
  descripción sintética de menos de 140 caracteres."
  resume="Procura que esta descripción contenga la palabra clave o palabra más importante que define esta página web. Incorpora palabras complementarias que enriquezcan y acoten la búsqueda para obtener mejores resultados."
  image="https://media.istockphoto.com/id/1148185998/vector/digital-java-code-text-computer-software-coding-vector-concept-programming-coding-script.jpg?s=612x612&w=0&k=20&c=a828FuiFmSROCCmc7glJKr1DSxakHEvpdq58D_m3TVw="
  image-axis="x"
  button="Más Info"
></div>
```


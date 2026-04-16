# shadcn/ui Guidelines

## Use these components first

Prefer these existing primitives when possible:

* `Button`
* `Card`
* `Input`
* `Textarea`
* `Badge`
* `Checkbox`
* `Dialog`
* `DropdownMenu`
* `Separator`
* `Sonner`

## Styling approach

* Use theme tokens first
* Favor utility classes over custom CSS unless global theming is needed
* Keep the two-color purple/green system intact
* Use inversion intentionally:
    * purple surfaces with green text
    * green surfaces with purple text

## Do not

* add a second UI framework
* replace shadcn/ui with custom ad hoc widgets unless necessary
* introduce gray default SaaS styling
* break the existing theme tokens


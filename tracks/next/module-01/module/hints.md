## Hint 1

Filtry URL najłatwiej normalizować małymi funkcjami dla statusu i page.

## Hint 2

DAL powinien wykonać membership check przed `listIssues`; szczegół porównuje `issue.projectId` z argumentem.

## Hint 3

W Action najpierw odczytaj zgłoszenie po `issueId`, potem sprawdź membership dla `issue.projectId`.

## Hint 4

DTO buduj jawną allow-listą pól, nie przez spread rekordu.

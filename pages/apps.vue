<template>
  <NuxtChild />
</template>

<router>
{
  meta: [
    {
      appicon: 'mdi-apps'
    },
    {
      apptitle: 'Helpdesk applications'
    },
    {
      appsubtitle: 'Helpdesk of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  middleware: ['auth', 'is-scope'],
  layout: 'apps'
};
</script>

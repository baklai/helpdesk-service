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
      apptitle: 'Helpdesk administration panel'
    },
    {
      appsubtitle: 'Helpdesk of the technical support department'
    }
  ]
}
</router>

<script>
export default {
  middleware: ['auth', 'is-admin'],
  layout: 'apps'
};
</script>

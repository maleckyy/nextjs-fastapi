'use client'
import React, { useState } from 'react'
import ProfileAvatar from '../ProfileAvatar'
import { useGetUserDetails } from '@/api/profile/useGetUserDetails'
import { Input } from '@/components/ui/input'
import { Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUploadAvatarToServer } from '@/api/profile/profileAvatar/useUploadAvatarToServer'
import { createToast } from '@/lib/toastService'
import { AvatarFormData, avatarSchema } from '@/schemas/uploadAvatar.schema'

export default function UploadProfileAvatar() {

  const { data, refetch } = useGetUserDetails()
  const [avatarPath, setAvatarPath] = useState<string | null>(null)

  const { control, handleSubmit } = useForm<AvatarFormData>({
    resolver: zodResolver(avatarSchema),
  })
  const uploadAvatarToServerMutation = useUploadAvatarToServer()

  function uploadAvatar(formData: AvatarFormData) {
    const file = formData.picture[0]
    const postFormData = new FormData()
    postFormData.append("file", file)
    uploadAvatarToServerMutation.mutate(postFormData, {
      onSuccess: () => {
        refetch()
        createToast("A new profile picture has been set", "success")
      },
      onError: (e) => {
        createToast("Error", "error", e.message)
      }
    })
  }

  function handleAvatarPreview(file: File) {
    const objectUrl = URL.createObjectURL(file)
    setAvatarPath(objectUrl)
  }

  return (
    <div className='flex flex-col gap-4'>
      {data && <ProfileAvatar username={data.username} widthInPx={220} photoPath={data.details.photo_path} preview={avatarPath} />}

      <div className='flex flex-row gap-2 items1-center'>
        <Controller
          name="picture"
          control={control}
          defaultValue={null}
          render={({ field, fieldState }) => (
            <div className="flex flex-col gap-2">
              <Input
                type="file"
                onChange={(e) => {
                  field.onChange(e.target.files)
                  console.log(e.target.files![0])
                  if (e.target.files) handleAvatarPreview(e.target.files[0])
                }}
                className="max-w-[300px]"
              />
              {fieldState.error && (
                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Button onClick={handleSubmit(uploadAvatar)}>
          Save<Upload />
        </Button>
      </div>
    </div>
  )
}

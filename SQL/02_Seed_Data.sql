SET IDENTITY_INSERT [UserProfile] ON
INSERT INTO [UserProfile]
  ([Id], [FirebaseId],[DisplayName], [FirstName], [LastName], [Email], [ImageLocation],  [DateCreated])
VALUES 
  (1, 'aitl29384', 'AnnaOcean', 'Anna', 'Ocean', 'ao@email.com', null,  '06-21-2020');

  INSERT INTO [Monthly]
  ([Id], [UserProfileId], [Month], [Year])
  VALUES
  (1, 1, 'May', 2021);

  INSERT INTO [MonthlyLayout]
  ([Id], [MonthlyId], [LayoutId], [InspiredBy], [ImageURL], [ResourceId], [style])
  VALUES
  (1, 1, 1, 'blah', null, 1, 'style');

    INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (1, 1,  'Cover Page', 1, 'this is a desc');

  INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (2, 1,  'Calender', 1, 'this is a desc');

    INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (3, 1,  'Quote Page', 1, 'this is a desc');

   INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (4, 1,  'Habit Tracker', 1, 'this is a desc');

    INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (5, 1,  'Mood Tracker', 1, 'this is a desc');

    INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (6, 1,  'Vertical Weekly', 1, 'this is a desc');

    INSERT INTO [Layout]
  ([Id], [UserProfileId], [Type], [TimeEstimate], [description])
  VALUES
  (7, 1,  'Horizontal Weekly', 1, 'this is a desc');

  INSERT INTO [Resources] 
  ([Id], [UserProfileId], [TypeOfMedia], [URL], [imageURL])
  VALUES
  (1,1,1,'thisIsAURL', 'thisIsAImageURL')

  INSERT INTO [TypeOfMedia]
  ([Id], [type])
  VALUES
  (1, 'YouTube')

  INSERT INTO [TypeOfMedia]
  ([Id], [type])
  VALUES
  (2, 'IG')
  
  INSERT INTO [TypeOfMedia]
  ([Id], [type])
  VALUES
  (3, 'Blog')
  
  INSERT INTO [TypeOfMedia]
  ([Id], [type])
  VALUES
  (4, 'Reddit')

